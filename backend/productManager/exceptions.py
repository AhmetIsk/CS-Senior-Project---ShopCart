from rest_framework.exceptions import PermissionDenied
from rest_framework import status


# {"product_id": "123", "quantity": "1"}

class DoesNotExistException(PermissionDenied):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = {"Error": "Does not exist"}
    default_code = 'invalid'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code
