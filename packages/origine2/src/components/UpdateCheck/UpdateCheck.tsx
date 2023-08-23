import { useEffect } from 'react';

function getLocalVersion() {
  useEffect(() => {
    fetch('...../package.json')
      .then((res) => res.json())
      .then((data) => {
        return data["version"];
      })
  }, []);
}

function loadLocalVersion() {
  useEffect(() => {
    fetch('https://api.github.com/repos/MakinoharaShoko/WebGAL_Terre/releases/latest')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
    })
      .then((res) => res.json())
      .then((data) => {
        return data["tag_name"];
      })
  }, []);
}

export default function UpdateCheck() {
  const loadVersion = getLocalVersion();
  const getVersion = getLocalVersion();


  return <div></div>;
}
