import { useMeta } from 'quasar';
import titleNameTemplate from './titlePageNameTemplate';

const titlePageName = (title) => {
    useMeta({title, titleTemplate: title => `${titleNameTemplate} ${title}`});
}

export default titlePageName

