const { default: axios } = require("axios");

class VAPIClass{

    constructor(assistantId, fileIds){
        this.assistantId = assistantId;
        this.fileIds =  fileIds;
        this.headers = { Authorization: `Bearer ${process.env['VAPI_API_KEY']}` };
        this.baseUrl = 'https://api.vapi.ai';
    }

    async createKnowledgeBase(){
        try {
            const sendObject = {
                provider: "trieve",
                searchPlan: {
                    searchType: "hybrid",
                    removeStopWords: true
                },
                createPlan: {
                    type: "create",
                    chunkPlans: [
                        {
                            "fileIds": this.fileIds,
                            targetSplitsPerChunk: 1,
                            splitDelimiters: ["######"]
                        }
                    ]
                },
                name: `name-${(new Date()).getTime()}`
            }
            const {data} = axios.post(`${this.baseUrl}/knowledge-base`, sendObject, { headers: this.headers } )
            return data;
        } catch (error) {
            console.log("error on create knowledgebase")
        }
        
    }

    updateAssistant(knowledgeBaseId){

    }
}
module.exports = VAPIClass;