from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer
from .models import Note, ShoppingCart


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/base/getNotes',
        '/base/addNote'
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = Note.objects.filter(user=user)
    print(notes)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNote(request):
    user = request.user
    print(request.data)
    serializer = NoteSerializer(data=request.data, many=True)
    return Response(serializer.data)
