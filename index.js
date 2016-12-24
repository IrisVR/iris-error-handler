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
  /* MongoDB Errors */
  150: {
    meta: {
      code: 150,
      error_type: 'ObjectIDInvalid',
      error_message: 'The id string is not a valid ObjectID'
    }
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
      error_type: 'UserNotFound',
      error_message: 'The user with the specified email was not found'
    }
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
  /* Third-party errors */
  1000: {
    meta: {
      code: 1000,
      error_type: 'MandrillError',
      error_message: 'There was an error with the mandrill emailing service'
    }
  }
};
