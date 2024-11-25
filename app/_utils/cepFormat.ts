export const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/(\d{5})(\d{3})/, "$1-$2") // Adiciona o hífen após os primeiros 5 dígitos
    .slice(0, 9); // Limita o tamanho a 9 caracteres
};
