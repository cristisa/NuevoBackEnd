import { useQuery } from 'react-query';
import { useDataProvider } from 'react-admin';
const useIntrospect = (options) => {
    const dataProvider = useDataProvider();
    return useQuery('introspect', () => dataProvider.introspect(), Object.assign({ enabled: false }, options));
};
export default useIntrospect;
//# sourceMappingURL=useIntrospect.js.map