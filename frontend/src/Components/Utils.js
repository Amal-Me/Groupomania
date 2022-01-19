//fonction pour vérifier une valeur vide, indéfini ou null retourne un booleen
//utilisé pour permettre l attente de certaines valeurs
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

//REGEX
export const verifInput = () => {
  let verifMdp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{6,12})$/;
  let verifMail = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i;

  let EmailF = document.getElementById("Email").value;
  let MotdepasseF = document.getElementById("Motdepasse").value;
  let MotdepassebisF = document.getElementById("Motdepassebis").value;

  let veriForm = true;

  if (verifMail.test(EmailF) === false) {
    document.getElementById("emailErrorMsg").innerText =
      "Veuillez renseigner un email valide";
    veriForm = false;
  }

  if (verifMdp.test(MotdepasseF) === false) {
    document.getElementById("MotdepasseErrorMsg").innerText =
      "Veuillez renseigner 6 à 12 caractères avec au moins une lettre minuscule , une lettre majuscule , un chiffre et un de ces caractères spéciaux: $ @ % * + - _ !";
    veriForm = false;
  }
  if (MotdepassebisF !== MotdepasseF) {
    document.getElementById("MotdepassebisErrorMsg").innerText =
      "Veuillez renseigner un mot de passe valide";
    veriForm = false;
  }
  return veriForm;
};
