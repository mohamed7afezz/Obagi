const BrandJourney = [
    {
      "q1": "20s",
      "q2": "No",
      "q3": "Preventative",
      "result": "Clinical Persona"
    },
    {
      "q1": "20s",
      "q2": "No",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "20s",
      "q2": "Yes",
      "q3": "Preventative",
      "result": "Clinical Persona"
    },
    {
      "q1": "20s",
      "q2": "Yes",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "30s",
      "q2": "No",
      "q3": "Preventative",
      "result": "Clinical Persona"
    },
    {
      "q1": "30s",
      "q2": "No",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "30s",
      "q2": "Yes",
      "q3": "Preventative",
      "result": "Medical Persona"
    },
    {
      "q1": "30s",
      "q2": "Yes",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "40s",
      "q2": "No",
      "q3": "Preventative",
      "result": "Clinical Persona"
    },
    {
      "q1": "40s",
      "q2": "No",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "40s",
      "q2": "Yes",
      "q3": "Preventative",
      "result": "Medical Persona"
    },
    {
      "q1": "40s",
      "q2": "Yes",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "50+",
      "q2": "No",
      "q3": "Preventative",
      "result": "Clinical Persona"
    },
    {
      "q1": "50+",
      "q2": "No",
      "q3": "Corrective",
      "result": "Medical Persona"
    },
    {
      "q1": "50+",
      "q2": "Yes",
      "q3": "Preventative",
      "result": "Medical Persona"
    },
    {
      "q1": "50+",
      "q2": "Yes",
      "q3": "Corrective",
      "result": "Medical Persona"
    }
]

export function getBrandJourney (questionsResult) {
    let ValueBrandJourney = [];
    ValueBrandJourney = BrandJourney.filter(function(itme){
      return itme.q1 == questionsResult.q1 && itme.q2 == questionsResult.q2 && itme.q3 == questionsResult.q3;
    });
    
    let result = ValueBrandJourney.length>0? ValueBrandJourney[0].result:'';
    return result;
}