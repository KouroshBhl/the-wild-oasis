import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        keyValue='discount'
        options={[
          {
            value: 'All',
            option: 'all',
          },
          {
            value: 'No Discount',
            option: 'no-discount',
          },
          {
            value: 'With Discount',
            option: 'with-discount',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
