import CabinRow from './CabinRow';
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || 'all';

  let filterCabins;
  if (filterValue === 'all') filterCabins = cabins;
  if (filterValue === 'no-discount') {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (isLoading) return <Spinner />;

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {filterCabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
