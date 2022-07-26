import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Profile, profileConvertor } from "~/modules/entity";
import { uidState } from "./auth";

interface Atom {
  currentUser?: Profile<Timestamp>;
}

export const profileState = atom<Atom>({
  key: "profile",
  default: { currentUser: undefined },
});

export const useListenProfile = () => {
  const setProfile = useSetRecoilState(profileState);
  const uid = useRecoilValue(uidState);
  useEffect(() => {
    if (!uid) return;
    const firestore = getFirestore();
    const creators = collection(firestore, "creators");
    const unsubscribe = onSnapshot(
      doc(creators, uid).withConverter(profileConvertor),
      (creator) => {
        setProfile({ currentUser: creator.data() });
      },
    );
    return () => {
      unsubscribe();
    };
  }, [uid, setProfile]);
};
