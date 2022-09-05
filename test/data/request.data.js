const moment = require('moment');

const requests = [
    {
        requestorName: 'Matt Cole',
        requestorEmail: 'mcole@metrolink.co.uk',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Metrolink',
        
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
                locationLimitStartDate: '2022-12-12',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-12-18',
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
        requestorName: 'Matt Cole',
        requestorEmail: 'mcole@metrolink.co.uk',
        requestorPhoneNumber: '+447480627388',
        requestorOrganisation: 'Metrolink',
        
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
                locationLimitStartDate: '2022-10-03',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-03',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Deansgate Castlefield',
                locations: [
                    'St Peters Square',
                    'Deansgate Castlefield'
                ],
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-04',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-04',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly Gardens',
                locations: [
                    'Market Street',
                    'Piccadilly Gardens',
                ],
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false
            },
            {
                locationLimitStartDate: '2022-10-05',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-05',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Victoria',
                locations: [
                    'Shudehill',
                    'Victoria',
                ],
                nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                electricalIsolationRequired: false,
                testTramsRequired: false,
                signallingResourceRequired: false,
            },
            {
                locationLimitStartDate: '2022-10-03',
                locationLimitStartTime: '01:00',
                locationLimitEndDate: '2022-10-03',
                locationLimitEndTime: '04:00',
                locationLimitStatus: 'Pending',
                locationLimitAccessType: 'Maintenance',
                locationSelect: 'Piccadilly',
                locations: [
                    'Exchange Square',
                    'Piccadilly',
                ],
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
    }
]

  module.exports = requests;