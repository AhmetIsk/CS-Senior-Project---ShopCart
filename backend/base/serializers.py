from rest_framework.serializers import ModelSerializer
from .models import Note
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'first_name', 'last_name', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        owner = serializers.Field(
            source='user.id')  # Make sure owner is associated with the User model in your models.py
        fields = ['body', 'user']

        def pre_save(self, obj):
            obj.user = self.request.user
