import { ObservationService } from "./observation_service";
import { ConceptService} from "./concept_service";
import { Observation } from "@/interfaces/observation";

async function alertSideEffects(patientId: number, typeConceptID='art side effects') {
    const data: Observation[] = await ObservationService.getObservations(
        patientId, ConceptService.getCachedConceptID(typeConceptID)
    );
    return data.filter((observation) => {
        return observation.children[0].value_coded == ConceptService.getCachedConceptID('No');
    });
}

export default {
    alertSideEffects
}