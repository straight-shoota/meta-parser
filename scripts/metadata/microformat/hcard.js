MetaParser.createFormat('HCard', {
  microformat: 'hcard',
  base: '.vcard',
  propertyNames: 'fn n adr agent bday category class email geo latitude longitude key label logo mailer nickname note org photo rev role sort-string sound tel title tz uid url'.split(/ /),
  subProperties: {
    'adr': 'post-office-box extended-address street-address locality region postal-code country country-name name type value'.split(/ /),
    'n': 'family-name given-name additional-name honorific-prefix honorific-suffix'.split(/ /),
    'org': ['organization-name','organization-unit'],
    'tel': ['type', 'value'],
    'mail': ['type', 'value'],
    'geo': ['latitude','longitude']
  }
}, MetaParser.Microformat)
