import { FolderInterface } from "@/apps/interfaces/AppInterface"

export const REPORTS: FolderInterface[] = [
  {
    name: 'Clinic',
    icon: 'reports.png',
    defaultFilesIcon: 'reports.png',
    files: [
        {
            name: 'Diagnosis Report',
            pathName: 'Spine Clinic Diagnosis Report'
        },
        {
            name: 'Patient Outcomes',
            pathName: 'Spine Clinic Outcomes Report'
        },
    ]
},
]