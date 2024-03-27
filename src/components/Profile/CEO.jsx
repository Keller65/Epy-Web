import { Navbar } from '../Navbar'
import { BadgeCheck } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getDatabase, set, ref, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../data';
import './CEO.css';

export function ProfileCEO() {
    const photoCEO = 'https://lh3.googleusercontent.com/a/ACg8ocLRTFF4soMeKO7cz0kHGnoDC7TbsaLuaryjWHPmioBWJg=s96-c';
    const [follow, setFollow] = useState(true);
    const [totalFollowers, setTotalFollowers] = useState(0);

    const auth = getAuth(app);

    const GetFollowers = useCallback(() => {
        const databaseFollowers = getDatabase(app);
        const path = ref(databaseFollowers, 'followers');
        const uid = auth.currentUser ? auth.currentUser.uid : null;

        onValue(path, (snapshot) => {
            const followersData = snapshot.val();

            if (followersData) {
                const followerDataForCurrentUser = followersData[uid];

                if (followerDataForCurrentUser) {
                    setFollow(followerDataForCurrentUser.follow);
                }
            }

            const totalFollowers = followersData ? Object.keys(followersData).length : 0;
            setTotalFollowers(totalFollowers);
        });
    }, [auth.currentUser]);

    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                GetFollowers();
            } else {
                console.log('No estás autenticado');
            }
        });

        return () => unsubscriber();
    }, [auth, GetFollowers]);

    const followUser = () => {
        const uid = auth.currentUser ? auth.currentUser.uid : null;

        setFollow((prevFollow) => !prevFollow);

        function writeUserData() {
            const db = getDatabase();
            set(ref(db, 'followers/' + uid), {
                follow: !follow
            });
        }

        function deleteUserData() {
            const db = getDatabase();
            remove(ref(db, 'followers/' + uid));
        }

        if (!follow) {
            deleteUserData();
        } else {
            writeUserData();
        }
    };

    return (
        <div className="CEO__screen">
            <div className='w-full flex justify-end px-0 pt-[5px]'>
                <Navbar />
            </div>

            <header className="w-full flex relative">
                <div className='flex gap-3 items-center relative'>
                    <picture className='relative w-[50px] h-[50px]'>
                        <img src={photoCEO} alt="photo CEO" id='photo__CEO' width='50' height='50' />
                        <BadgeCheck className='absolute bottom-[-5px] right-0' size={20} fill="#ffdc38" stroke="#fffcf7" />
                    </picture>

                    <div>
                        <p id="name_ceo">Margie Lopez</p>
                        <p id='followers'>{totalFollowers} seguidores</p>
                    </div>
                </div>

                <button className={`${follow ? 'following' : 'not-following'}`} onClick={followUser}>
                    {follow ? 'seguir' : 'siguiendo'}
                </button>
            </header>

            <main className='tags__ceo__container'>
                <div className="tag__ceo">CEO</div>
                <div className="tag__ceo">Propietaria</div>
                <div className="tag__ceo">Creadora</div>
                <div className="tag__ceo">Impulsadora</div>
                <div className="tag__ceo">Analista</div>
            </main>
        </div>
    );
}
