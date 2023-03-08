// This of course will come from a real db in the future.
const inspectionsData = {
	inspection: [{
		"id": 1,
		"user": "huurder1",
		"completed": "true,",
		"recordDamage": [{
			"id": 1,
			"location": "Woonkamer",
			"newDamage": "Ja",
			"type": "Calamiteit",
			"date": "2023-01-16T19:20+01:00",
			"immediateAction": "Ja",
			"description": "Gat in de deur",
			"image":  [{"id": 1, "img": "img1"}, {"id": 2, "img": "img2"}]
		},
		{
			"id": 2,
			"location": "Badkamer",
			"newDamage": "Ja",
			"type": "Calamiteit",
			"date": "2023-01-16T19:20+01:00",
			"immediateAction": "Nee",
			"description": "Gat in de deur",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"recordOverdueMaintenance": [{
			"id": 1,
			"location": "Zolder",
			"type": "Houtrot",
			"immediateAction": "Ja",
			"costIndication": "1500+",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"inspectTechnicalInstallations": [{
			"id": 1,
			"location": "Keuken",
			"type": "verwarming",
			"reportedMalfunction": "Ja",
			"test": "test1.pdf",
			"approved": "Ja",
			"description": "Kleine gele plek op het plafond als gevolg van lekkage",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"identifyModifications": [{
			"id": 1,
			"existing": "existing1.pdf",
			"place": "Keuken",
			"executed": "huurder",
			"descriptionModification": "Nieuwe tegels",
			"action": "accepteren",
			"description": "nieuwe witte tegels geplaatst, geen bezwaar",
			"image":  [{"id": 1, "img": "img1"}]
		}]
	},
	{
		"id": 2,
		"user": "huurder2",		
		"completed": "true,",
		"recordDamage": [{
			"id": 1,
			"location": "Badkamer",
			"newDamage": "Ja",
			"type": "Calamiteit",
			"date": "2023-01-16T19:20+01:00",
			"immediateAction": "Nee",
			"description": "Gat in de deur",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"recordOverdueMaintenance": [{
			"id": 1,
			"location": "Zolder",
			"type": "Houtrot",
			"immediateAction": "Ja",
			"costIndication": "1500+",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"inspectTechnicalInstallations": [{
			"id": 1,
			"location": "Keuken",
			"type": "verwarming",
			"reportedMalfunction": "Ja",
			"test": "test1.pdf",
			"approved": "Ja",
			"description": "Kleine gele plek op het plafond als gevolg van lekkage",
			"image":  [{"id": 1, "img": "img1"}]
		}],
		"identifyModifications": [{
			"id": 1,
			"existing": "existing1.pdf",
			"place": "Keuken",
			"executed": "huurder",
			"descriptionModification": "Nieuwe tegels",
			"action": "accepteren",
			"description": "nieuwe witte tegels geplaatst, geen bezwaar",
			"image":  [{"id": 1, "img": "img1"}]
		}]
	},
]
};
export default inspectionsData;


