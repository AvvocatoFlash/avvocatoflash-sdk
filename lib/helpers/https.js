const request = require('request-promise');
const Utils = require('./utils');

class HttpModule {

  constructor(opts = {env: 'production'}) {
    this.opts = opts;
    this.rp = request;
  }

  _getBaseUrl() {

    if (this.opts.env === 'production') {
      return `https://api.avvocatoflash.it`;
    }

    return `https://api.avvocatoflash.dev`;
  }

  async _callApi({path, body = null, method = 'POST', format = 'json'}) {

    const opts = {
      method,
      uri: path,
      baseUrl: this._getBaseUrl(),
      json: (format === 'json')
    };

    if (body) {
      opts.body = body;
    }

    opts.headers = Object.assign({
      'Content-Type': `application/${format}`
    }, (this.opts.apiKey) ? {
      'Authorization': `Bearer ${this.opts.apiKey}`,
    } : {});

    try {

      const res = await this.rp(opts);

      if (format !== 'json') {
        return JSON.parse(res);
      }

      return res;

    } catch (error) {

      throw error;
    }
  }

  async createLegalCase(legalCase) {

    try {

      const response = await this._callApi({
        path: '/legalCase',
        body: legalCase,
        method: 'PUT'
      });

      return response;

    } catch (error) {

      throw error;

    }
  }

  async getCouncilsList({postCode = '', search = '', limit = 200, offset = 1}) {

    const params = {postCode, search, limit, offset};
    const queryParams = Object.keys(Utils.removeEmptyStrings(params)).map(key => key + '=' + params[key]).join('&');

    try {

      const response = await this._callApi({
        path: `/location/councils?${queryParams}`,
        method: 'GET'
      });

      return response;

    } catch (error) {

      throw error;

    }
  }
}

module.exports = HttpModule;
