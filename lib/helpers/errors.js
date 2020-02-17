const throwError = (message, detail) => {
  const err = new Error(message);

  Object.assign(err, detail);

  throw err;
};

const throwExposable = (code, status, description, exposeMeta) => {
  const error = getError(code);
  if(!error) {
    throwError('unknown_error_code', {
      code,
      status,
      description,
      exposeMeta
    });
  }
  const err = new Error(code);
  err.exposeCustom_ = true;

  err.status = status || error.status;
  err.description = description || error.description;

  if(exposeMeta) {
    err.exposeMeta = exposeMeta;
  }

  throw err;
};

function castExposable(error) {

  if(error.exposeCustom_) throw error;

  throwExposable(error.message, error.status, error.description);

}

function getError(errorCode) {
  const code = ERRORS[errorCode];
  if(!errorCode || !code) {
    return null;
  }
  return code;
}

function assert(condition, ...args) {
  if(!condition) {
    throwError(...args);
  }
}


function assertExposable(condition, ...args) {
  if(!condition) {
    throwExposable(...args);
  }
}

const ERRORS = {
  unknown_error: {
    status: 500,
    description: 'Unknown error',
  },
  access_denied: {
    status: 401,
    description: 'Access to a forbidden resource',
  },
  invalid_configuration: {
    status: 400,
    description: 'The configuration you are trying to use is not valid',
  },
  invalid_token: {
    status: 400,
    description: 'The token you are trying to use is not valid',
  },
  token_expired: {
    status: 401,
    description: 'This token is expired',
  },
};

module.exports = {
  throwError,
  throwExposable,
  assert,
  assertExposable,
  castExposable,
  ERRORS,
};

