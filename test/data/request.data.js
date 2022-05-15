const requestFull = {
    accessRequestCompetentPerson: "A Comp",
    accessRequestDescription: "7 day shutdown of eccles line to allow for re-railing of the following curves:\n- 27 IB\n- 30 IB/OB\n- 31 IB/OB\n- 33 IB/OB",
    accessRequestSiteContactPhone: "07450854576",
    accessRequestTitle: "Eccles line blockade works ",
    accessTypeDisruptive: true,
    created: "2022-04-27T09:01:12+01:00",
    locationLimitItems: [
        {
            durationType: "D",
            locationIssolation: "De-energise",
            locationLimitDate: "2022-05-01",
            locationLimitDuration: "7",
            locationLimitStatus: "pending",
            locationLimitTime: "20:00",
            locationLimitType: "Occupation",
            locationSelect: "MediaCityUK",
            locations: [
                "Eccles",
                "Ladywell",
                "Weaste",
                "Langworthy",
                "Broadway",
                "MediaCityUK"
            ],
            "nearestHospital": "Salford Royal, Stott Lane, Salford, M6 8HD",
            "signallingResource": true
        }
    ],
    methodStatementItems: [
      {
        methodStatement: "Isolate and de-energise site\nEstablish traffic management\nCommence rail removal",
        methodStatementEquipment: "Cutting tools, welding equipment",
        methodStatementPPE: "Five Point PPE (Minumum)",
        methodStatementStatus: "pending",
        methodStatementTitle: "Re-railing method statement",
        methodStatementTrackVehicles: "Excavator"
      }
    ],
    projectChangeRequestID: "n/a",
    projectOrganisation: "TfGM",
    projectTitle: "Eccles line blockade",
    requestStatus: "Submitted for approval",
    requestorEmail: "jbell@metrolink.co.uk",
    requestorName: "Jack Bell",
    requestorOrganisation: "TfGM",
    requestorPhone: "07450854576",
    riskAssessmentItems: [
        {
            impact: "4",
            likelihood: "3",
            mitigatedLikelihood: "2",
            riskAssessmentStatus: "pending",
            riskHazardDescription: "Risk of injury to staff by lifting and moving rail ",
            riskHazardMitigation: "Use of safe lifting equipment and procedures",
            riskHazardTitle: "Heavy lifting of rail"
        }
    ],
    updated: "2022-04-27T09:05:17+01:00"
  }

  module.exports = {
      requestFull: requestFull
  }