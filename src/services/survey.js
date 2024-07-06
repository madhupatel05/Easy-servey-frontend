import api from "../utils/api/api";

export function getSurvey() {
    return api.get(`http://localhost:3000/surveys`);
}

export function EditSurvey(id, data){
    return api.put(`http://localhost:3000/surveys/${id}`, data)
}


export function AddSurvey(data){
    return api.post(`http://localhost:3000/surveys`, data)
   
}