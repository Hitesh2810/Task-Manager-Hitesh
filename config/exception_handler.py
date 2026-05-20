import logging

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        if response.status_code >= 500:
            logger.exception("Unhandled server error: %s", exc)
        else:
            view = context.get('view')
            logger.warning("API error in %s: %s", getattr(view, '__class__', view), exc)
        return response

    logger.exception("Unhandled exception in request: %s", exc)
    return Response(
        {
            'detail': 'An unexpected error occurred. Please try again later.',
            'errors': getattr(exc, 'detail', str(exc)),
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
