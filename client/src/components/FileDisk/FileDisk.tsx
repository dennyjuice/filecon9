import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from '../../redux/slices/fileSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const FileDisk = () => {
  const { files, currentDir } = useTypedSelector((state) => state.files);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [dispatch, currentDir]);

  return (
    <ul>
      {files.map(({ _id: id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default FileDisk;
