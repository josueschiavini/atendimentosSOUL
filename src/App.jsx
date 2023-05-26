import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import Loading from "./components/loading";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingImage, setShowLoadingImage] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_atendimentos")
      ? JSON.parse(localStorage.getItem("cad_atendimentos"))
      : [];

    setData(db_costumer);
  }, []);

  const handleRemove = async (index) => {
    const newArray = [...data];

    const integra = data[index];
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    integra.dataAtendimento = formattedDate;

    setIsLoading(true);
    setShowLoadingImage(true);

    try {
      if (integra.atendimento !== "Reiki") {
        const response = await fetch(
          "https://api.sheetmonkey.io/form/6uV7qdhV4eooFJ4GXStcHN",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(integra),
          }
        );

        if (response.ok) {
          console.log("Dados enviados com sucesso!");
        } else {
          console.log("Erro ao enviar os dados.");
        }
      } else {
        console.log("Atendimento igual a 'Reiki', não fazendo requisição.");
      }
    } catch (error) {
      console.log("Erro ao enviar os dados:", error);
    } finally {
      setIsLoading(false);
      setShowLoadingImage(false);
    }

    newArray.splice(index, 1);

    setData(newArray);

    localStorage.setItem("cad_atendimentos", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={1200} w="100%" h="100vh" py={10} px={2} bg="yellow.50">
        <Button colorScheme="purple" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO ATENDIMENTO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Atendimento
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Idade
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Endereço
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Estado Civil
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ atendimento, nome, idade, endereco, ecivil }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{atendimento}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{nome}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{idade}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{endereco}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{ecivil}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ atendimento, nome, idade, endereco, ecivil, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <CheckIcon
                      fontSize={20}
                      onClick={() => handleRemove(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
      {showLoadingImage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <img
            src="./img/loading.png"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}
    </Flex>
  );
};

export default App;