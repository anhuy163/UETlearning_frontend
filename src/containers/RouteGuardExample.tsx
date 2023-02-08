// import { Auth, Hub } from 'aws-amplify';

// import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import Splash from '../../components/Splash';
// import useAuth from '../../app/hooks/useAuth';
// import {
//   HOME_PATH,
//   LOGIN_PATH,
//   REGISTER_PATH,
//   COMPLETE_PW_PATH,
//   FORGOT_PW_PATH,
//   RESET_PW_PATH,
//   GENERAL_SETTING_KEY,
//   PLANS_PATH,
//   MANAGEMENT_COMPANY_PATH,
//   UPGRADE_PLAN,
//   MEMBER_PATH,
// } from '../../constants';
// import useProfile from '../../app/hooks/useProfile';
// import useLazyQueryProfie from '../../app/hooks/useLazyQueryProfile';
// import useLazyQueryPermission from '../../app/hooks/useLazyQueryPermission';
// import LoginForm from '../LoginForm';
// import AuthLayout from '../../components/AuthLayout';
// import useSettingOrganization from '../../app/hooks/useSettingOrganization';
// import useLazyQueryGetSettingOrganization from '../../app/hooks/useLazyQueryGetSettingOrganization';
// import Maintain from '../../components/Maintain';
// import { useAppSelector } from '../../app/hooks';
// import { currentUserPermission as currentUserPermissionSelector } from '../../app/redux/slices/userSlice';
// import PermissionEnum from '../../interfaces/enums/PermissionEnum';
// import LandingPageWelcome from '../LandingPageWelcome';
// import PopupAlertUpgradePlan from '../../components/PopupAlertUpgradePlan';
// import { RoleCompany } from '../../interfaces/enums/RoleCompany';
// import PlanPackageEnum from '../../interfaces/enums/PlanEnum';

// export default function RouterGuard({ children }: PropsWithChildren<{}>) {
//   const { requiredChangePwUser, checkTokenIsExpired, logout } = useAuth();
//   const { fetchData: fetchUserProfile, loading: isFetchingProfile } = useLazyQueryProfie();
//   const { fetchData: fetchUserPermission, data: permission } = useLazyQueryPermission();
//   const { removeCurrentUser, currentUser } = useProfile();
//   const { data: dataSettingOrganization, fetchData } = useLazyQueryGetSettingOrganization();
//   const { setSettingOrganization, currentsettingOrganization } = useSettingOrganization();
//   const router = useRouter();
//   const [isValidating, setIsValidating] = useState(true);
//   const userRef = useRef(null);
//   const currentUserPermission = useAppSelector(currentUserPermissionSelector);
//   const generalSetting = currentUserPermission?.generalSetting;
//   const isPermissionAcceptMaintain = generalSetting !== PermissionEnum.HIDE;
//   const PUBLIC_PATHS = [LOGIN_PATH, COMPLETE_PW_PATH, FORGOT_PW_PATH, RESET_PW_PATH, REGISTER_PATH];
//   const PUBLIC_PATHS_FREE_PLAN = [
//     LOGIN_PATH,
//     COMPLETE_PW_PATH,
//     FORGOT_PW_PATH,
//     RESET_PW_PATH,
//     REGISTER_PATH,
//     PLANS_PATH,
//     MANAGEMENT_COMPANY_PATH,
//     UPGRADE_PLAN,
//     MEMBER_PATH,
//   ];

//   const doGuard = () => {
//     const currentPathname = router.pathname;

//     if (currentPathname !== LOGIN_PATH) {
//       if ((currentPathname === COMPLETE_PW_PATH && !requiredChangePwUser) || !PUBLIC_PATHS.includes(currentPathname)) {
//         logout();
//       }
//     }
//   };

//   const turnOffSplash = useCallback(
//     (isPublic = false) => {
//       if (isPublic) {
//         setIsValidating(false);
//       } else {
//         setTimeout(() => {
//           permission !== null && setIsValidating(false);
//         }, 200);
//       }
//     },
//     [permission],
//   );

//   const turnoffSplashWithPublicPage = () => {
//     const currentPathname = router.pathname;
//     if (PUBLIC_PATHS.includes(currentPathname)) {
//       turnOffSplash(true);
//     }
//   };

//   useEffect(() => {
//     if (currentUser?.member?.companyId) {
//       fetchData(currentUser?.member?.companyId);
//     }
//   }, [currentUser?.member?.companyId]);
//   useEffect(() => {
//     //@TODO: CHANGE HARDCODE AFTER API DONE
//     if (dataSettingOrganization) {
//       const dataSetting: any = {};
//       dataSettingOrganization?.forEach((item: any) => {
//         dataSetting[item.itemKey] = item;
//       });
//       const alertData = JSON.parse(dataSetting[GENERAL_SETTING_KEY.REDMIND_TIME_SHEET].itemValue);
//       const maintainData = JSON.parse(dataSetting[GENERAL_SETTING_KEY.MAINTAIN_MODE].itemValue);
//       setSettingOrganization({
//         ...currentsettingOrganization,
//         workingDayPerMonth: dataSetting[GENERAL_SETTING_KEY.EFFORT_MAN_DAY]?.itemValue,
//         alertSetting: alertData.status === 'ON' ? true : false,
//         alertDays: alertData.limitDay,
//         isMaintain: maintainData.status === 'ON' ? true : false,
//         messageMaintain: maintainData.message,
//       });
//     }
//   }, [dataSettingOrganization]);

//   useEffect(() => {
//     if (userRef.current && permission) {
//       turnOffSplash();
//     }
//   }, [permission, turnOffSplash]);

//   useEffect(() => {
//     fetchUserProfile(true);
//     fetchUserPermission();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router.pathname]);

//   const listener = (data) => {
//     switch (data.payload.event) {
//       case 'tokenRefresh':
//         console.log('tokenRefresh');
//         setTimeout(() => {
//           // for sure splash will turn off
//           if (isValidating) {
//             setIsValidating(false);
//           }
//         }, 200);
//         break;
//       case 'tokenRefresh_failure':
//         console.log('tokenRefreshFail');
//         logout();
//         break;
//     }
//   };

//   useEffect(() => {
//     const currentPathname = router.pathname;
//     setIsValidating(true);
//     if (checkTokenIsExpired()) {
//       logout();
//       return;
//     }

//     Auth.currentAuthenticatedUser()
//       .then((user) => {
//         // setUser(user);
//         userRef.current = user;
//         if (user && PUBLIC_PATHS.includes(currentPathname)) {
//           router.replace(HOME_PATH);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         removeCurrentUser();
//         // if (AuthErrorEnum.UserNotLoggedInYet === err) {
//         // doGuard();/
//         // }
//       })
//       .finally(() => {
//         setIsValidating(false);
//       });

//     Hub.listen('auth', listener);
//     return () => {
//       Hub.remove('auth', () => {
//         console.log('remove auth listener');
//       });
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // DOnt remove this hook if you find any hook with the same dependencies , because I need this run by order
//   useEffect(() => {
//     turnoffSplashWithPublicPage();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router.pathname]);

//   if (
//     !isPermissionAcceptMaintain &&
//     currentsettingOrganization.isMaintain &&
//     router.pathname !== 'login' &&
//     !(isValidating || isFetchingProfile)
//   ) {
//     return <Maintain content={currentsettingOrganization.messageMaintain} />;
//   }
//   if (
//     currentUser &&
//     !currentUser?.member?.companyId &&
//     !PUBLIC_PATHS.includes(router.pathname) &&
//     !(isValidating || isFetchingProfile)
//   ) {
//     return <LandingPageWelcome />;
//   }

//   if (
//     currentUser &&
//     currentUser?.member?.companyId &&
//     (!currentUser?.member?.planName || currentUser?.member?.planName === PlanPackageEnum.FREE) &&
//     !PUBLIC_PATHS_FREE_PLAN.includes(router.pathname) &&
//     !(isValidating || isFetchingProfile)
//   ) {
//     return <PopupAlertUpgradePlan isShowContent={currentUser.member.roleName === RoleCompany.OWNER} />;
//   }

//   return (
//     <>
//       {isValidating || isFetchingProfile ? (
//         <Splash />
//       ) : !currentUser && !PUBLIC_PATHS.includes(router.pathname) ? (
//         <AuthLayout title="Login">
//           <LoginForm />
//         </AuthLayout>
//       ) : (
//         children
//       )}
//     </>
//   );
// }
