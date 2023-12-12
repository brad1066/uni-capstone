'use client'

import { Section } from "@prisma/client"

type EditSectionFormProps = {
    section: Section
    onUpdateSave: (updatedSection: Section) => void
}

export default function EditSectionForm({ section, onUpdateSave }: EditSectionFormProps) {
    return (<>

    </>)
}