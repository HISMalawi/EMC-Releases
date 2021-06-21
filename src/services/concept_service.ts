import { Service } from "./service";
import ConceptNameDictionary from "@/Data/ConceptNameDictionary"; 

export class ConceptService extends Service {
    constructor() {
        super()
    }

    static async getConceptName(conceptId: number) {
        const concept = await this.getCachedConceptName(conceptId)

        if (concept) return concept

        return this.getConceptNameFromApi(conceptId)
    }

    static getConceptID(conceptName: string) {
        try {
            return this.getCachedConceptID(conceptName)
        } catch (e) {
            return this.getConceptIDFromApi(conceptName)
        }
    }

    static getCachedConceptID(conceptName: string) {
        const concepts = ConceptNameDictionary.filter(item => {
            return item.name.match(new RegExp(conceptName, 'i'))
        })
        return this.resolveConcept(concepts, conceptName)
    }

    static async getConceptIDFromApi(name: string) {
        const concepts = await super.getJson(`/concepts`, {name})
        return this.resolveConcept(concepts, name)
    }
    
    static async getConceptNameFromApi(conceptId: number) {
        const concept = await super.getJson(`/concepts/${conceptId}`)

       
        if (concept) return concept.concept_names[0].name
    }

    static async getCachedConceptName(conceptId: number) {
        const concepts = ConceptNameDictionary.filter(item => {
            return item.concept_id === conceptId
        })
        
        if (concepts.length >= 1) return concepts[0].name
    }

    private static resolveConcept(concepts: any, conceptName: string) {
        if (concepts.length === 1) return concepts[0].concept_id

        throw `Concept name ${conceptName} was not found or has a duplicates`
    }
}