import NavLayout from '../../../components/layout/navigation/NavLayout';
import { NextPageWithLayout } from '../../_app';

const SearchBusiness: NextPageWithLayout = () => {
  return <div>Businesses goes here</div>;
};

export default SearchBusiness;

SearchBusiness.getLayout = (page) => <NavLayout>{page}</NavLayout>;