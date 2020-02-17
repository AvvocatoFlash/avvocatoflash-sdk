const path = require('path');
const sinon = require('sinon');
const Https = require(path.join(srcDir, '/helpers/https') );

describe('Helpers: Https', () => {

  beforeEach(async () => {

    sandbox = sinon.createSandbox();

    this.opts = {
      env: 'development',
      apiKey: ''
    };

    this.baseUrl = 'https://api.avvocatoflash.dev';
    this.https = new Https(this.opts);
    this.stubRequest = sandbox.stub(this.https, 'rp');
  });

  afterEach(async () => {

    sandbox && sandbox.restore();

    this.opts = {
      env: 'development',
      apiKey: ''
    };

  });

  describe('_callApi', () => {

    it('Should callAPI post', async () => {

      this.stubRequest.resolves({ res: 'success'});

      const resp = await this.https._callApi({
        path: '/xxx',
        body: {a: 1},
        method: 'POST',
        format: 'json'
      });

      const opts = this.stubRequest.args[0][0];
      expect(opts.method).to.eq('POST');
      expect(opts.uri).to.eq('/xxx');
      expect(opts.baseUrl).to.eq(this.baseUrl);
      expect(opts.json).to.be.true;

      expect(opts.headers.Authorization).to.undefined;
      expect(opts.headers['Content-Type']).to.eq('application/json');
      expect(opts.body.a).to.be.eq(1);
      expect(resp).to.be.deep.eq({ res: 'success'});

    });

    it('Should callAPI post with token', async () => {

      this.stubRequest.resolves({ res: 'success'});
      this.opts.apiKey = 'fake-token';

      const resp = await this.https._callApi({
        path: '/xxx',
        body: {a: 1},
        method: 'POST',
        format: 'json'
      });

      const opts = this.stubRequest.args[0][0];
      expect(opts.method).to.eq('POST');
      expect(opts.uri).to.eq('/xxx');
      expect(opts.baseUrl).to.eq(this.baseUrl);
      expect(opts.json).to.be.true;
      expect(opts.headers.Authorization).to.eq('Bearer fake-token');
      expect(opts.headers['Content-Type']).to.eq('application/json');
      expect(opts.body.a).to.be.eq(1);
      expect(resp).to.be.deep.eq({ res: 'success'});

    });

    it('Should callAPI get', async () => {

      this.stubRequest.resolves({ res: 'success'});
      this.opts.apiKey = 'fake-token';

      const resp = await this.https._callApi({
        path: '/xxx',
        method: 'GET',
      });

      const opts = this.stubRequest.args[0][0];

      expect(opts.method).to.eq('GET');
      expect(opts.uri).to.eq('/xxx');
      expect(opts.baseUrl).to.eq(this.baseUrl);
      expect(opts.json).to.be.true;
      expect(resp).to.be.deep.eq({ res: 'success'});

    });

    it('Should throw on error', async () => {

      this.stubRequest.rejects(new Error('fake-error'));

      await expect(this.https._callApi({
        path: '/xxx',
        method: 'GET',
      })).to.be.rejectedWith(Error, 'fake-error');

    });
  });

  describe('_getBaseUrl', () => {

    it('Should _getBaseUrl development', async () => {
      const resp = await this.https._getBaseUrl();
      expect(resp).to.eq(this.baseUrl);
    });

    it('Should _getBaseUrl production', async () => {
      this.opts.env = 'production';
      const resp = await this.https._getBaseUrl();
      expect(resp).to.eq('https://api.avvocatoflash.it');
    });
  });

  describe('postLegalCase', () => {

    it('Should postLegalCase', async () => {

      const rawCase = {
        fullName: 'cristian izzo',
        email: 'test@avvocatoflash.it',
        mobile: '3398002000',
        description: 'i got some issue with my landlord i would like to have some suggestion from a lawyer.',
        councilId: 'xxx'
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').resolves('ok');

      const resp = await this.https.createLegalCase(rawCase);

      expect(resp).to.eq('ok');
      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/legalCase',
        body: rawCase,
        method: 'PUT'
      })).to.be.true;
    });

    it('Should throw postLegalCase', async () => {

      const rawCase = {
        fullName: 'cristian izzo',
        email: 'test@avvocatoflash.it',
        mobile: '3398002000',
        description: 'i got some issue with my landlord i would like to have some suggestion from a lawyer.',
        councilId: 'xxx'
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').rejects(new Error('fake-error'));

      await expect(this.https.createLegalCase(rawCase)).to.be.rejectedWith(Error, 'fake-error');

      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/legalCase',
        body: rawCase,
        method: 'PUT'
      })).to.be.true;
    });

  });

  describe('getCouncilsList', () => {

    it('Should getCouncilsList with all optional params', async () => {

      const params = {
        postCode: '',
        search: '',
        limit: 1000,
        offset: 1,
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').resolves('ok');

      const resp = await this.https.getCouncilsList(params);

      expect(resp).to.eq('ok');
      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/location/councils?limit=1000&offset=1',
        method: 'GET'
      })).to.be.true;
    });

    it('Should getCouncilsList with search', async () => {

      const params = {
        search: 'napoli',
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').resolves('ok');

      const resp = await this.https.getCouncilsList(params);

      expect(resp).to.eq('ok');
      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/location/councils?search=napoli&limit=200&offset=1',
        method: 'GET'
      })).to.be.true;
    });

    it('Should getCouncilsList with postCode', async () => {

      const params = {
        postCode: '81100',
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').resolves('ok');

      const resp = await this.https.getCouncilsList(params);

      expect(resp).to.eq('ok');
      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/location/councils?postCode=81100&limit=200&offset=1',
        method: 'GET'
      })).to.be.true;
    });

    it('Should throw getCouncilsList', async () => {

      const params = {
        postCode: '81100',
      };

      const stubCallApi = sandbox.stub(this.https, '_callApi').rejects(new Error('fake-error'));

      await expect(this.https.getCouncilsList(params)).to.be.rejectedWith(Error, 'fake-error');

      expect(stubCallApi.calledOnce).to.be.true;
      expect(stubCallApi.calledWith({
        path: '/location/councils?postCode=81100&limit=200&offset=1',
        method: 'GET'
      })).to.be.true;
    });

  });

});
