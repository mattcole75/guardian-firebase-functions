const AccessRequestSchema = {
    requester: {
        localId: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        organisation: ''
    },
    siteDetails: {
        siteDescription: '',
        urgentAccessRequired: false,
        electricalIsolationRequired: false,
        signallingResourceRequired: false,
        testTramsRequired: false,
        accessFirstDay: '',
        accessLastDay: '',
    },
    locations: [],
    permitRequirements: {
        hazardZone: false,
        pedestrians: false,
        piling:  false,
        crane: false,
        deepExcavation: false,
        scaffold: false,
        demolition: false,
        OLEexcavation: false,
        OLEstructures: false,
        accessRoutes: false,
        operationsAffected: false
    },
    electricalIsolationRequirements: {
        OLEencroachment: false,
        HVIntegrityRisk: false,
        plant: false,
    },
    planningInformation: {
        possessionDetails: 'TBC',
        possessionCategory: 'Standard',
        escalatedDate: '',
        picop: 'TBC',
        pic: 'TBC',
        safetyResourceRequired: false,
        nwrAdjacent: false,
        coLocate: false,
        withinDisruptivePossession: false,
        organisation: 'TBC',
        line: 'TBC',
        worksiteLimits: 'TBC',
        isolationType: 'All OHLE is Live',
        isolationDetails: '',
        onTrackMachineCount: '',
        rrvType: 'TBC',
        trolleyType: 'TBC',
        heavyMachineType: 'TBC',
        siteRemarks: '',
        tramConfigurationType: 'TBC'
    },
    workStages: [],
    eventLog: [],
    status: 'Draft',
    updated: '',
    created: '',
    inuse: true,
}

module.exports = AccessRequestSchema;