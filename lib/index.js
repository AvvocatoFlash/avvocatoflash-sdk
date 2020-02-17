const Errors = require('./helpers/errors');
const Https = require('./helpers/https');

/**
 * AvvocatoFlash SDK
 * Contains all the blockchain tools
 */
class AvvocatoFlashSdk extends Https {
  /**
   *
   * @param opts Options
   * @param opts.apiKey api key (must be registered from an admin)
   */
  constructor(opts) {
    super(opts);
    this.opts = Object.assign({
      env: 'production', // development/production
      apiKey: '',
    }, opts);

    Errors.assert(this.opts.apiKey, 'invalid_token', {opts});
    Errors.assert(this.opts.env && (this.opts.env === 'development' || this.opts.env === 'production'), 'invalid_configuration', {opts});
  }

  /**
   * Post LegalCase
   * @param {string<fullName>} fullName
   * @param {string<email>} email
   * @param {string<mobile>} mobile phone - optional prefix by default +39
   * @param {string<description>} description min length 30chars
   * @param {string<councilId>} council uuid
   * @return {Promise<Object<legalCaseId>>} legalCase uuid
   */
  async postLegalCase({
                        fullName,
                        email,
                        mobile,
                        description,
                        councilId
                      }) {

    const response = await this.createLegalCase({
      fullName,
      email,
      mobile,
      description,
      councilId
    });

    return response;
  }

  /**
   * Get Councils
   * @param {string<postCode>} postCode - optional
   * @param {string<search>} search - optional
   * @param {number<limit>} limit - optional by default 200
   * @param {number<offset>} offset - optional by default 1
   * @return {Promise<String>} legalCase uuid
   */
  async getCouncils({postCode, search, limit, offset}) {

    const response = await this.getCouncilsList({
      postCode,
      search,
      limit,
      offset
    });

    return response;
  }

}

module.exports = AvvocatoFlashSdk;
