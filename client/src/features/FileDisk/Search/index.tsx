import React, { useState } from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getFiles, searchFiles, sortByName } from '../fileSlice';

const { Search } = Input;

interface SearchFilesProps {
  className: string;
}

const SearchFiles = ({ className }: SearchFilesProps) => {
  const { currentDir, isLoading } = useAppSelector((state) => state.files);
  const [valueSearch, setValueSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const dispatch = useAppDispatch();

  const searchHandler = (searchInput: string) => {
    setValueSearch(searchInput);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (searchInput) {
      setSearchTimeout(
        window.setTimeout(
          (value: string) => {
            dispatch(searchFiles(value.toLowerCase()));
          },
          500,
          searchInput,
        ),
      );
    } else {
      dispatch(getFiles(currentDir)).then(() => {
        dispatch(sortByName());
      });
    }
  };

  return (
    <Search
      placeholder="Поиск файлов"
      className={className}
      value={valueSearch}
      onChange={(event) => searchHandler(event.target.value)}
      loading={isLoading}
    />
  );
};

export default SearchFiles;
