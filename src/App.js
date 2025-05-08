import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState({ role: '', plan: '' })

  // 1. 로그인한 유저 가져오기
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  // 2. 유저가 있으면 역할/플랜 정보 조회
  useEffect(() => {
    if (user?.id) {
      fetchUserInfo(user.id).then((info) => {
        setUserInfo(info)
      })
    }
  }, [user])

  // 3. 역할과 플랜 정보를 가져오는 함수
  async function fetchUserInfo(userId) {
    console.log('🟡 STEP 1: 입력된 userId:', `"${userId}"`, userId.length)
  
    // 1단계: user_roles 테이블에서 role_id 가져오기 (전체 출력 + 에러 확인)
    const { data: roleLink, error: roleErr } = await supabase
      .from('user_roles')
      .select('*')  // role_id만 가져오지 않고 전체 출력
      .eq('user_id', userId)
  
    console.log('🔍 roleLink:', roleLink)
    console.log('❗ roleQueryError:', roleErr)
  
    const roleId = roleLink?.[0]?.role_id
    console.log('🟡 STEP 2: roleId:', roleId)
  
    // 2단계: user_plan_links 테이블에서 plan_id 가져오기
    const { data: planLink, error: planErr } = await supabase
      .from('user_plan_links')
      .select('*')
      .eq('user_id', userId)
  
    console.log('🔍 planLink:', planLink)
    console.log('❗ planQueryError:', planErr)
  
    const planId = planLink?.[0]?.plan_id
    console.log('🟡 STEP 3: planId:', planId)
  
    // 3단계: roles 테이블에서 역할 이름 조회
    let roleName = 'unknown'
    if (roleId) {
      const { data: role, error: roleFetchError } = await supabase
        .from('roles')
        .select('name')
        .eq('id', roleId)
  
      roleName = role?.[0]?.name ?? 'unknown'
      console.log('🟢 STEP 4: roleName:', roleName)
      console.log('❗ roleFetchError:', roleFetchError)
    }
  
    // 4단계: plans 테이블에서 플랜 이름 조회
    let planName = 'unknown'
    if (planId) {
      const { data: plan, error: planFetchError } = await supabase
        .from('plans')
        .select('name')
        .eq('id', planId)
  
      planName = plan?.[0]?.name ?? 'unknown'
      console.log('🟢 STEP 5: planName:', planName)
      console.log('❗ planFetchError:', planFetchError)
    }
  
    return {
      role: roleName,
      plan: planName
    }
  }
  
  

  return (
    <div>
      <h1>유저 상태 확인</h1>
      {user ? (
        <>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>역할:</strong> {userInfo.role}</p>
          <p><strong>플랜:</strong> {userInfo.plan}</p>
        </>
      ) : (
        <p>로그인 필요</p>
      )}
    </div>
  )
}

export default App


