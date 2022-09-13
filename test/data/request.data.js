const moment = require('moment');

const requests = [
    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-10',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-16',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-17',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-23',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-24',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-30',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-01',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-07',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-08',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-14',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },
    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-15',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-21',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },
    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Eccles Line Renewal',
        projectOrganisation: 'TfGM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Eccles Line Blockade',
        accessRequestDescription: 'Seven day shutdown of eccles line to allow for re-railing',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-22',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-28',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'MediaCityUK',
                locations: [
                    'Eccles',
                    'Ladywell',
                    'Weaste',
                    'Langworthy',
                    'Broadway',
                    'MediaCityUK'
                ],
                colocate: 'Worksite cannot be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: true,
                electricalIsolationType: 'Special Isolation',
                electricalIsolationRequirements: 'Isolate the Eccles line, but allow operations to continue on TPL.',
                testTramsRequired: true,
                testTramRequirements: 'Two trams will be required on the final day to confirm operational status.',
                signallingResourceRequired: true,
                signallingResourceRequirements: 'Test sigalling system is operating as expected.'
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'excavationRequired',
            'chapter8Protection',
            'manualHandling',
            'poweredAccessEquipment',
            'hotWorks',
            'testTrams'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-10',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-10',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-11',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-11',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-12',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-12',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-09-13',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-13',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-17',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-17',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-18',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-18',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-19',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-19',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-09-20',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-20',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-24',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-24',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-25',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-25',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-09-26',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-26',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-09-27',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-27',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-01',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-01',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-02',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-02',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-03',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-03',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-10-04',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-04',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },
    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-08',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-08',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-09',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-09',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-10',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-10',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-10-11',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-11',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-15',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-15',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-16',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-16',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-17',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-17',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-10-18',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-18',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-22',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-22',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-23',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-23',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-24',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-24',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-10-25',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-25',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: true,
        projectTitle: 'Metrolink Remote Condition Monitoring',
        projectOrganisation: 'KAM',
        projectRAMs: 'Approved by KAM',

        accessRequestTitle: 'Sensor Installation',
        accessRequestDescription: 'Installing Temperature Sensors in the SERs in the city centre.',
        accessRequestCompetentPerson: 'Scott Jibson',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-29',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-29',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-30',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-30',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-31',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-31',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-11-01',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-11-01',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],
        hazards: [
            'lvElectrical',
            'withinSER'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-15',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-15',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-22',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-22',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-29',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-29',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-10-06',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-06',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-13',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-13',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-20',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-20',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    },

    {
        requestorName: 'Rand Althor',
        requestorEmail: 'rand.althor@btt.com',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Bing Town Traders',
        
        associatedWithProject: false,
        projectTitle: '',
        projectOrganisation: '',
        projectRAMs: '',

        accessRequestTitle: 'Points Machine Repair',
        accessRequestDescription: 'Carry out corrective maintenance on MKT09M points machine',
        accessRequestCompetentPerson: 'N Limit',
        accessRequestCompetentPersonPhoneNumber: '+447450854789',

        locationLimitItems: [
            {
                locationLimitStartDate: '2022-09-27',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-09-27',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Possession',
                locationSelect: 'Market Street',
                locations: [
                    'Market Street'
                ],
                colocate: 'Worksite can be co-located',
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            }
        ],

        hazards: [
            'additionalHazards',
            'trackPlant',
            'chapter8Protection',
            'manualHandling',
            'hotWorks'
        ]
    }
]

  module.exports = requests;