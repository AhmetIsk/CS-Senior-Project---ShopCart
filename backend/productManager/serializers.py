from rest_framework import serializers
from base.models import ProductBase


class ProductBaseSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    barcode = serializers.CharField(required=True)
    name = serializers.CharField(max_length=100, blank=True, null=True)
    photo = serializers.ImageField(blank=True, null=True)

    def create(self, validated_data):
        """
        Create and return a new `ProductBase` instance, given the validated data.
        """
        return ProductBase.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `ProductBase` instance, given the validated data.
        """
        instance.barcode = validated_data.get('barcode', instance.title)
        instance.name = validated_data.get('name', instance.code)
        instance.photo = validated_data.get('photo', instance.linenos)
        instance.save()
        return instance