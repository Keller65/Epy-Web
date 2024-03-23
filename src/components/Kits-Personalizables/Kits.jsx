import { useState } from 'react';
import { motion } from 'framer-motion';

function DragAndDrop() {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (event, info) => {
    setDragPosition({ x: info.offset.x, y: info.offset.y });
  };

  const Search = (e)=> {
    e.prevent
  }

  return (
    <div className='w-[100vw] h-[100vh] flex'>
      <section className='h-full w-80 bg-red-300 px-3 py-3 flex flex-col gap-3'>
        <form>
          <input className='w-full h-[35px] rounded-[6px] text-sm px-3' type="text" name="productos" id="productos" />
        </form>

        <div className='bg-blue-500 h-60'></div>
      </section>

      <section></section>
    </div>
  );
}

export default DragAndDrop;