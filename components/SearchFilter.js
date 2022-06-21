import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  filter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";

export default function SearchFilters() {
  const router = useRouter();
  const [filters] = useState(filterData);

  const SearchProperties = ([filtervalues]) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filtervalues);
    console.log(values);
    values.forEach((item) => {
      if (item.name && filtervalues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <>
      <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {filters.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              onChange={(e) =>
                SearchProperties([{ [filter.queryName]: e.target.value }])
              }
              p="2"
              w="fit-content"
              placeholder={filter.placeholder}
            >
              {filter?.items?.map((items) => (
                <option key={items.value} value={items.value}>
                  {items.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
    </>
  );
}
