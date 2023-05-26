import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [atendimento, setAtendimento] = useState(dataEdit.atendimento || "");
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [idade, setIdade] = useState(dataEdit.idade || "");
    const [endereco, setEndereco] = useState(dataEdit.endereco || "");
    const [ecivil, setEcivil] = useState(dataEdit.ecivil || "");

    const handleSave = async () => {
        if (!atendimento || !nome || !idade || !endereco || !ecivil) return;

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { atendimento, nome, idade, endereco, ecivil };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { atendimento, nome, idade, endereco, ecivil }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_atendimentos", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Atendimentos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Atendimento</FormLabel>
                                <select value={atendimento} onChange={(e) => setAtendimento(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option name="Reiki" value="Reiki">Reiki</option>
                                    <option name="Atendimento Fraterno" value="Atendimento Fraterno">Atendimento Fraterno</option>
                                    <option name="Atendimento Espiritual" value="Atendimento Espiritual">Atendimento Espiritual</option>
                                </select>
                            </Box>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    name="Nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Idade</FormLabel>
                                <Input
                                    name="Idade"
                                    type="number"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Endereço</FormLabel>
                                <Input
                                    name="Endereco"
                                    type="text"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Estado Civil</FormLabel>
                                <select value={ecivil} onChange={(e) => setEcivil(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option name="Solteiro(a)" value="Solteiro(a)">Solteiro(a)</option>
                                    <option name="Casado(a)" value="Casado(a)">Casado(a)</option>
                                    <option name="Divorciado(a)" value="Divorciado(a)">Divorciado(a)</option>
                                    <option name="Viúvo(a)" value="Viúvo(a)">Viúvo(a)</option>
                                </select>
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" mr={14} onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;  