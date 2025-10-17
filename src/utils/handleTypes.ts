interface Type {
  name: string;
  id: number;
  color?: string;
}

export const handleTypes = (types: Type[], _value: string, index: string) => {
  const indexTags = {
    id_0: ["build android", "build webgl", "trilha português"],
    id_5000: ["build android", "build webgl", "trilha espanhol"],
    id_6000: ["build android", "build webgl", "trilha inglês"],
    play_store: ["build android"],
    languages: [
      "csv espanhol",
      "csv inglês",
      "csv português",
      "planilha de tradução",
      "revisão de conteúdo espanhol",
      "revisão de conteúdo inglês",
    ],
    platform_a: [
      "build android",
      "build webgl",
      "trilha português",
      "trilha inglês",
      "trilha espanhol",
    ],
  };

  const tags = indexTags[index as keyof typeof indexTags];
  if (tags) {
    return types.some((type) => tags.includes(type.name.toLowerCase()));
  }
  return false;
};
