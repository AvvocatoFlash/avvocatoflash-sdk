 # AvvocatoFlash SDK

[![CircleCI](https://circleci.com/gh/amontech/amon-lib/tree/master.svg?style=svg&circle-token=35a5a437b160dcd5edeb20b19b5b75fcebd7082d)](https://circleci.com/gh/amontech/amon-lib/tree/master)

This SDK is a set of common utilities used in various part of AvvocatoFlash projects.

## Publish on NPM
- update the package version 
- npm publish

## Install

Install via npm
```bash
npm i -S @avvocatoflash/avvocatoflash-sdk
```

Import in your project
```javascript
const AvvocatoFlashSdk = require('avvocatoflash-sdk');
import AvvocatoFlashSdk from 'avvocatoflash-sdk';
```

## Examples

First you need to get an instance of AvvocatoFlashSdk. This instance is useful to use the SDK on different environments.

```javascript
const afSdk = new AvvocatoFlashSdk({ env: 'development', apiKey: 'your-key' });
```

`env` can be either `development` or `production`\
`apiKey` please contact [team@avvocatoflash.it](mailto:team@avvocatoflash.it?subject=[GitHub]%20APIKEY%20Request) 

### Get Councils

You can get the list of the italian councils from the `getCouncils` method, you need the council uuid before you can post a new legal case.

Search by council name : `napoli`, `milano`, `roma` ext...\
Search by council postCode : `81100`, `20019`, `00127` ext...

params : `search`, `postCode`, `limit`, `offset`

- Get Council with all params
```javascript
const resp = afSdk.getCouncils({ search: 'alba', limit: 1, offset: 1});
//  {
//    councils: [
//      {
//        _id: '58f8403bbe7bc800044ba91e',
//        name: 'Alba',
//        code: '004003',
//        sigle: 'CN',
//        postCode: '12051',
//        Region: '5d5a110d29ab354952b0cd1e',
//        Province: '5d5a111b29ab354952b15432',
//        label: 'Alba - 12051'
//      }
//  ],
//  currentPage: 1,
//  totPages: 87,
//  totRecords: 8645
//  }
```

- Get Council by name
```javascript
const resp = afSdk.getCouncils({ search: 'alba', limit: 1});
//  {
//    councils: [
//      {
//        _id: '58f8403bbe7bc800044ba91e',
//        name: 'Alba',
//        code: '004003',
//        sigle: 'CN',
//        postCode: '12051',
//        Region: '5d5a110d29ab354952b0cd1e',
//        Province: '5d5a111b29ab354952b15432',
//        label: 'Alba - 12051'
//      }
//  ],
//  currentPage: 1,
//  totPages: 87,
//  totRecords: 8645
//  }
```

- Get Council by postCode
```javascript
const resp = afSdk.getCouncils({ postCode: '12051', limit: 1});
//  {
//    councils: [
//      {
//        _id: '58f8403bbe7bc800044ba91e',
//        name: 'Alba',
//        code: '004003',
//        sigle: 'CN',
//        postCode: '12051',
//        Region: '5d5a110d29ab354952b0cd1e',
//        Province: '5d5a111b29ab354952b15432',
//        label: 'Alba - 12051'
//      }
//  ],
//  currentPage: 1,
//  totPages: 87,
//  totRecords: 8645
//  }
```


### Post Legal Case
You can post a new legal case using the `postLegalCase` method
                        
- Post LegalCase
```javascript
const resp = afSdk.postLegalCase({
  fullName: 'Mark Helber', 
  email:'test@avvocatoflash.it', 
  mobile: '3388002000', 
  description: 'some description', 
  councilId: '58f8403bbe7bc800044ba91e'
});
// {legalCaseId: '5e4ae3b782609900174773e4'}
```

params : \
`fullName`\
`email`\
`mobile` can be either with prefix `+443388002000` or `3388002000` by defualt italian prefix will be attached `+39`\
`description` min length 30 chars\
`councilId` council uuid
