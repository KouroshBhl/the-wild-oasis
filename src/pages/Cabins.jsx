import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [isShow, setIsShow] = useState(false);
  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
      <p>filter</p>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setIsShow((show) => !show)}>Add Cabin</Button>
      {isShow && <CreateCabinForm />}
    </Row>
  );
}

export default Cabins;
