import { useMeta } from 'quasar';
const titlePageName = (title) => {
    const titleTemplate = "JAVI-CC JUEGOS API | ";
    useMeta({title, titleTemplate: title => `${titleTemplate} ${title}`});
}

export default titlePageName

