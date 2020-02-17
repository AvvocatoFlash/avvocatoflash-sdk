const path = require('path');
const sinon = require('sinon');
const AvvocatoFlashSDK = require(path.join(srcDir, '/index'));

describe('AvvocatoFlash SDK', () => {

  beforeEach(async () => {

    sandbox = sinon.createSandbox();

  });

  afterEach(async () => {

    sandbox && sandbox.restore();

  });

  describe('AvvocatoFlash Class', () => {

    it('instantiate', () => {

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      expect(sdk).to.exist;
      expect(sdk.opts.env).to.eq('production');
      expect(sdk.opts.apiKey).to.eq('xxx');
      expect(sdk.postLegalCase).to.be.a('function');

    });

    it('should throw an error if not instantiate correctly', async () => {

      expect(() => new AvvocatoFlashSDK()).to.throw(Error, 'invalid_token');

    });

  });

  describe('postLegalCase', () => {

    it('Should create legal case', async () => {

      const rawCase = {
        fullName: 'cristian izzo',
        email: 'test@avvocatoflash.it',
        mobile: '3398002000',
        description: 'i got some issue with my landlord i would like to have some suggestion from a lawyer.',
        councilId: 'xxx'
      };

      const fakeResponse = {legalCaseId: '5e4ae3b782609900174773e4'};

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      const stubCreateLegalCase = sandbox.stub(sdk, 'createLegalCase').resolves(fakeResponse);

      const resp = await sdk.postLegalCase(rawCase);

      expect(resp).to.eq(fakeResponse);
      expect(stubCreateLegalCase.calledOnce).to.be.true;
      expect(stubCreateLegalCase.calledWith(rawCase)).to.be.true;

    });

    it('Should throw error', async () => {

      const rawCase = {
        fullName: 'cristian izzo',
        email: 'test@avvocatoflash.it',
        mobile: '3398002000',
        description: 'i got some issue with my landlord i would like to have some suggestion from a lawyer.',
        councilId: 'xxx'
      };

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      sandbox.stub(sdk, 'createLegalCase').rejects(new Error('fake-error'));

      await expect(sdk.postLegalCase(rawCase)).to.be.rejectedWith(Error, 'fake-error');

    });

  });

  describe('getCouncils', () => {

    it('Should get councils with all params', async () => {

      const params = {
        postCode: '',
        search: '',
        limit: 100,
        offset: 1,
      };

      const fakeResponse = {
        councils: [
          {
            _id: '58f8403bbe7bc800044ba91e',
            name: 'Alba',
            code: '004003',
            sigle: 'CN',
            postCode: '12051',
            Region: '5d5a110d29ab354952b0cd1e',
            Province: '5d5a111b29ab354952b15432',
            label: 'Alba - 12051'
          }
        ],
        currentPage: 1,
        totPages: 87,
        totRecords: 8645
      };

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      const stubGetCouncils = sandbox.stub(sdk, 'getCouncilsList').resolves(fakeResponse);

      const resp = await sdk.getCouncils(params);

      expect(resp).to.eq(fakeResponse);
      expect(stubGetCouncils.calledOnce).to.be.true;
      expect(stubGetCouncils.calledWith(params)).to.be.true;

    });

    it('Should get councils with postCode', async () => {

      const params = {
        postCode: '12051',
      };

      const fakeResponse = {
        councils: [
          {
            _id: '58f8403bbe7bc800044ba91e',
            name: 'Alba',
            code: '004003',
            sigle: 'CN',
            postCode: '12051',
            Region: '5d5a110d29ab354952b0cd1e',
            Province: '5d5a111b29ab354952b15432',
            label: 'Alba - 12051'
          }
        ],
        currentPage: 1,
        totPages: 87,
        totRecords: 8645
      };

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      const stubGetCouncils = sandbox.stub(sdk, 'getCouncilsList').resolves(fakeResponse);

      const resp = await sdk.getCouncils(params);

      expect(resp).to.eq(fakeResponse);
      expect(stubGetCouncils.calledOnce).to.be.true;
      expect(stubGetCouncils.calledWith(Object.assign(params, {
        search: undefined,
        limit: undefined,
        offset: undefined
      }))).to.be.true;

    });

    it('Should get councils with search', async () => {

      const params = {
        search: 'alba',
      };

      const fakeResponse = {
        councils: [
          {
            _id: '58f8403bbe7bc800044ba91e',
            name: 'Alba',
            code: '004003',
            sigle: 'CN',
            postCode: '12051',
            Region: '5d5a110d29ab354952b0cd1e',
            Province: '5d5a111b29ab354952b15432',
            label: 'Alba - 12051'
          }
        ],
        currentPage: 1,
        totPages: 87,
        totRecords: 8645
      };

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      const stubGetCouncils = sandbox.stub(sdk, 'getCouncilsList').resolves(fakeResponse);

      const resp = await sdk.getCouncils(params);

      expect(resp).to.eq(fakeResponse);
      expect(stubGetCouncils.calledOnce).to.be.true;
      expect(stubGetCouncils.calledWith(Object.assign(params, {
        postCode: undefined,
        limit: undefined,
        offset: undefined
      }))).to.be.true;

    });

    it('Should throw error', async () => {

      const params = {
        search: 'alba',
      };

      const sdk = new AvvocatoFlashSDK({apiKey: 'xxx'});
      sandbox.stub(sdk, 'getCouncilsList').rejects(new Error('fake-error'));

      await expect(sdk.getCouncils(params)).to.be.rejectedWith(Error, 'fake-error');

    });

  });

});
