import { Excercise } from "../types/Excercise";
interface BodyPartCount {
    kroppsdel: string;
    antal: number;
  }
const countBodyParts = (arr: Excercise[]): BodyPartCount[] => {
    const bodyPartCount: Record<string, number> = {};

    // Räkna förekomsterna av varje kroppsdel
    arr.forEach((exercise) => {
      const kroppsdel = exercise.kroppsdel;
      if (bodyPartCount[kroppsdel]) {
        bodyPartCount[kroppsdel] += 1;
      } else {
        bodyPartCount[kroppsdel] = 1;
      }
    });

    // Omvandla till en sorterad array baserat på antal förekomster
    const sortedBodyParts: BodyPartCount[] = Object.entries(bodyPartCount)
      .sort((a, b) => b[1] - a[1])
      .map(([kroppsdel, antal]) => ({ kroppsdel, antal })); 
      return sortedBodyParts
  };
  const top2 = (arr: Excercise[]): string => {
    const sortedBodyParts = countBodyParts(arr);
  
    if (sortedBodyParts.length === 0) return "";
    if (sortedBodyParts.length === 1) return sortedBodyParts[0].kroppsdel;
    return `${sortedBodyParts[0].kroppsdel} / ${sortedBodyParts[1].kroppsdel}`;
  };
  
export default top2;