from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import ShoppingCart, UserMeta, ProductBase, PurchaseHistory
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.forms.models import model_to_dict
from base.serializers import UserMetaSerializer
from datetime import datetime, timedelta
from django.db.models import Sum
from drf_extra_fields.fields import Base64ImageField


def get_stats(user):
    data = {'total_expenses': {'monthly': 0, 'weekly': 0, '15-days': 0},
            'categorical_expenses': {},
            'total_quantities': {'monthly': 0, 'weekly': 0, '15-days': 0},
            'categorical_quantities': {},
            }

    last_month = datetime.today() - timedelta(days=30)
    fifteen_days = datetime.today() - timedelta(days=15)
    last_week = datetime.today() - timedelta(days=7)

    last_month_purchases = PurchaseHistory.objects.filter(user=user).filter(purchase_date__gte=last_month)
    last_fifteen_purchases = PurchaseHistory.objects.filter(user=user).filter(purchase_date__gte=fifteen_days)
    last_week_purchases = PurchaseHistory.objects.filter(user=user).filter(purchase_date__gte=last_week)

    data['total_expenses']['monthly'] = last_month_purchases.aggregate(Sum('price_bought'))['price_bought__sum']
    data['total_quantities']['monthly'] = last_month_purchases.aggregate(Sum('quantity'))['quantity__sum']

    data['total_expenses']['15-days'] = last_fifteen_purchases.aggregate(Sum('price_bought'))['price_bought__sum']
    data['total_quantities']['15-days'] = last_fifteen_purchases.aggregate(Sum('quantity'))['quantity__sum']

    data['total_expenses']['weekly'] = last_week_purchases.aggregate(Sum('price_bought'))['price_bought__sum']
    data['total_quantities']['weekly'] = last_week_purchases.aggregate(Sum('quantity'))['quantity__sum']

    categories = ProductBase.objects.all().values_list('category').distinct()
    for category in categories:
        category = category[0]
        data['categorical_expenses'][category] = {'monthly': 0, 'weekly': 0, '15-days': 0}
        data['categorical_quantities'][category] = {'monthly': 0, 'weekly': 0, '15-days': 0}
        last_month_c = last_month_purchases.filter(product_base__category__icontains=category)
        data['categorical_expenses'][category]['monthly'] = \
            last_month_c.aggregate(Sum('price_bought'))[
                'price_bought__sum']

        data['categorical_quantities'][category]['monthly'] = \
            last_month_c.aggregate(Sum('quantity'))[
                'quantity__sum']

        last_fifteen_c = last_fifteen_purchases.filter(product_base__category__icontains=category)
        data['categorical_expenses'][category]['15-days'] = \
            last_fifteen_c.aggregate(Sum('price_bought'))[
                'price_bought__sum']

        data['categorical_quantities'][category]['15-days'] = \
            last_fifteen_c.aggregate(Sum('quantity'))[
                'quantity__sum']

        last_week_c = last_week_purchases.filter(product_base__category__icontains=category)
        data['categorical_expenses'][category]['weekly'] = \
            last_week_c.aggregate(Sum('price_bought'))[
                'price_bought__sum']

        data['categorical_quantities'][category]['weekly'] = \
            last_week_c.aggregate(Sum('quantity'))[
                'quantity__sum']

    data['percentage_categorical_expenses'] = {'monthly': {}, 'weekly': {}, '15-days': {}}
    for category, expense in data['categorical_expenses'].items():
        for time, val in expense.items():
            if val is None:
                data['categorical_expenses'][category][time] = 0
            else:
                data['percentage_categorical_expenses'][time][category] = 100 * (val / data['total_expenses'][time])

    data['percentage_categorical_quantities'] = {'monthly': {}, 'weekly': {}, '15-days': {}}
    for category, expense in data['categorical_quantities'].items():
        for time, val in expense.items():
            if val is None:
                data['categorical_quantities'][category][time] = 0
            else:
                data['percentage_categorical_quantities'][time][category] = 100 * (val / data['total_quantities'][time])

    return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['test'] = "asdadss"

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        user_data = model_to_dict(self.user)
        del user_data['password']

        qs = UserMeta.objects.get(user=self.user.id)
        serializer = UserMetaSerializer(qs, context={'request': self.context['request']})

        data['userMeta'] = {**serializer.data}
        data['stats'] = get_stats(self.user)

        return data


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    avatar = Base64ImageField(required=False, max_length=None, use_url=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'avatar')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        # Create a shopping cart for the user and save it into users' metadata
        cart = ShoppingCart.objects.create(name='My Shopping Cart', user=user, priority='Medium')

        if validated_data.get('avatar', None):
            um = UserMeta.objects.create(user=user, avatar=validated_data['avatar'])
        else:
            um = UserMeta.objects.create(user=user)
        um.shopping_carts.add(cart)
        um.save()

        return user
