const data = {
    HTTP_CODE: 200,
    HTTP_MESSAGE: 'Success',
    HTTP_RESULT: [ 
        {
          entityId: 'SAMPLEID123',
          externalId: 'SAMPLEID123',
          isPerson: 'FALSE',
          companyName: 'SAMPLE COMPANY INC.',
          firstName: '',
          middleName: '',
          lastName: '',
          subsidiary: 2,
          category: '',
          creditLimit: 0,
          taxItem: 'S-PH',
          vatregnumber: '012345678',
          defaultAddress: 'sample default address123',
          Address1_addr1: 'address1',
          Address1_city: 'CITY',
          Address1_state: 'STATE',
          Address1_country: 'PH',
          Address1_addrText: 'SAMPLE ADDRESS Philippines',
          addgb1_attention: 'NAME III',
          Address1_addressBookAddress_text: 'SAMPLE ADDRESS Philippines',
          label: 'SAPMPLE ADRESS',
          Address1_defaultBilling: 'TRUE',
          Address1_defaultShipping: 'FALSE',
          Address2_attention: '',
          Address2_addr1: 'SAPMPLE ADRESS',
          Address2_defaultBilling: 'FALSE',
          Address2_defaultShipping: 'TRUE',
          shipcomplete: 'FALSE'
        }
      
      ]
}

const resdata = ()=>{ 
  return data;
}
module.exports = {resdata} ;