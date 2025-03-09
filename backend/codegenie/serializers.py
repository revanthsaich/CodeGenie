from rest_framework import serializers

class CodeGenerationSerializer(serializers.Serializer):
    description = serializers.CharField(required=True)
    code = serializers.CharField(read_only=True)