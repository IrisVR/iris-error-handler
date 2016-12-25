module.exports = {
  '-1': {
    meta: {
      code: -1,
      error_type: 'UnknownError',
      error_message: 'An unknown error occurred'
    }
  },
  /* Request header errors */
  100: {
    meta: {
      code: 100,
      error_type: 'MissingHeaderField',
      error_message: 'Authorization header is required'
    }
  },
  101: {
    meta: {
      code: 101,
      error_type: 'InvalidHeaderFormat',
      error_message: 'Authorization field should be formatted `Bearer ` + token'
    }
  },
  102: {
    meta: {
      code: 102,
      error_type: 'AuthTokenInvalid',
      error_message: 'The auth token is invalid or has expired'
    }
  },
  103: {
    meta: {
      code: 103,
      error_type: 'ApiKeyInvalid',
      error_message: 'The API key is missing, is invalid, or was revoked'
    }
  },
  /* MongoDB Errors */
  150: {
    meta: {
      code: 150,
      error_type: 'ObjectIDInvalid',
      error_message: 'The id string is not a valid ObjectID'
    }
  },
  160: {
    meta: {
      code: 160,
      error_type: 'NotFound',
      error_message: 'The document does not exist in our database',
    },
  },
  /* User errors */
  200: {
    meta: {
      code: 200,
      error_type: 'UsernameMissing',
      error_message: 'The username field is required'
    }
  },
  201: {
    meta: {
      code: 201,
      error_type: 'UsernameInvalid',
      error_message: 'The username is not a valid email format'
    }
  },
  202: {
    meta: {
      code: 202,
      error_type: 'UsernameTaken',
      error_message: 'The username is already registered'
    }
  },
  203: {
    meta: {
      code: 203,
      error_type: 'UserEmailNotFound',
      error_message: 'The user with the specified email was not found'
    }
  },
  204: {
    meta: {
      code: 204,
      error_type: 'UserIDNotFound',
      error_message: 'The user with the specified Id was not found',
    },
  },
  205: {
    meta: {
      code: 205,
      error_type: 'PasswordMissing',
      error_message: 'The password field is required'
    }
  },
  206: {
    meta: {
      code: 206,
      error_type: 'PasswordInvalid',
      error_message: 'The password is not within the allowed length [8, 512]'
    }
  },
  207: {
    meta: {
      code: 207,
      error_type: 'PasswordIncorrect',
      error_message: 'The password is incorrect'
    }
  },
  208: {
    meta: {
      code: 208,
      error_type: 'PasswordTokenInvalid',
      error_message: 'The password token is invalid or has expired'
    }
  },
  210: {
    meta: {
      code: 210,
      error_type: 'NameMissing',
      error_message: 'The full_name field is required'
    }
  },
  /* Pano errors */
  300: {
    meta: {
      code: 300,
      error_type: 'PanoNotFound',
      error_message: 'The pano with the specified ID was not found'
    }
  },
  301: {
    meta: {
      code: 301,
      error_type: 'AWSSignedURLError',
      error_message: 'There was an error retrieving the AWS S3 signed URL for pano upload'
    }
  },
  302: {
    meta: {
      code: 302,
      error_type: 'QueuePanoError',
      error_message: 'There was an error adding the pano to the image-splitting queue'
    }
  },
  303: {
    meta: {
      code: 303,
      error_type: 'DequeuePanoError',
      error_message: 'There was an error removing the pano from the image-splitting queue'
    }
  },
  304: {
    meta: {
      code: 304,
      error_type: 'JobRequeueError',
      error_message: 'There was an error requeueing the job to redis kue'
    }
  },
  305: {
    meta: {
      code: 305,
      error_type: 'JobDestroyError',
      error_message: 'There was an error destroying the job from redis kue'
    }
  },
  310: {
    meta: {
      code: 310,
      error_type: 'PanosetNotFound',
      error_message: 'The panoset with the specified ID was not found'
    }
  },
  320: {
    meta: {
      code: 320,
      error_type: 'ProjectNotFound',
      error_message: 'The project with the specified ID was not found'
    }
  },
  330: {
    meta: {
      code: 330,
      error_type: 'PublicCodeError',
      error_message: 'The public sharing code is invalid, or the permission settings have changed'
    }
  },
  331: {
    meta: {
      code: 331,
      error_type: 'MissingEntriesField',
      error_message: 'The request body must contain an entries field'
    }
  },
  332: {
    meta: {
      code: 332,
      error_type: 'InvalidEntriesFormat',
      error_message: 'The entries value must be an array'
    }
  },  
  350: {
    meta: {
      code: 350,
      error_type: 'PermissionsError',
      error_message: 'You do not have access to this document'
    }
  },
  360: {
    meta: {
      code: 360,
      error_type: 'ThumbnailError',
      error_message: 'There was an error generating the thumbnail'
    }
  },
  370: {
    meta: {
      code: 370,
      error_type: 'PanoUploadError',
      error_message: 'At least one required field is missing'
    }
  },
  /* Team errors */
  400: {
    meta: {
      code: 400,
      error_type: 'TeamNotFound',
      error_message: 'The team was not found',
    },
  },
  405: {
    meta: {
      code: 405,
      error_type: 'CancellationError',
      error_message: 'Either you do not have admin rights to perform this action, or the subscription does not exist',
    },
  },
  /* Billing errors */
  501: {
    meta: {
      code: 501,
      error_type: 'EstimationError',
      error_message: 'The plan ID or billing address was not provided or properly formatted',
    },
  },
  /* Notification Errors */
  601: {
    meta: {
      code: 601,
      error_type: 'ParamNotFound',
      error_message: 'A route parameter is required',
    },
  },
  605: {
    meta: {
      code: 605,
      error_type: 'TitleNotFound',
      error_message: 'A notification title is required',
    },
  },
  606: {
    meta: {
      code: 606,
      error_type: 'MessageNotFound',
      error_message: 'A notification message is required',
    },
  },
  610: {
    meta: {
      code: 610,
      error_type: 'NotificationNotFound',
      error_message: 'The notification with the specified Id was not found',
    },
  },
  /* Third-party errors */
  1000: {
    meta: {
      code: 1000,
      error_type: 'MandrillError',
      error_message: 'There was an error with the mandrill emailing service'
    }
  },
  1010: {
    meta: {
      code: 1010,
      error_type: 'ChargebeeError',
      error_message: 'There was an error with the Chargebee service',
    },
  },
};
