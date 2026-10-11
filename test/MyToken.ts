// [04:50 ~ 07:40 작성 → 07:50 실행] test/MyToken.ts — 2단계: 0으로 고치고, 잔액(balanceOf) 테스트 추가
//   [04:50] totalSupply 기대값 1 → 0
//   [05:20] it("should return 0 balance for signer 0", async () => { }) 추가
//   [05:45] const signers = await hre.ethers.getSigners();
//   [06:10] expect(await myTokenC.balanceOf()).equal(0);
//           → 빨간 밑줄 "Expected 1 arguments, but got 0" (balanceOf 는 주소를 넣어야 함)
//   [07:20] balanceOf(signers[0].address) 로 수정
//
// 설명:
// - getSigners() : Hardhat 테스트 계정 20개. signers[0] = 컨트랙트를 배포한 계정 (Account #0)
// - balanceOf(주소) : 5-1 에서 만든 mapping 의 자동 getter. 아직 아무도 토큰을 안 받았으니 0
//
// [07:50] npx hardhat test 결과 (강의):
//   mytoken deploy
//     ✓ should return name
//     ✓ should return symbol
//     ✓ should return decimals
//     ✓ should return 0 totalSupply
//     ✓ should return 0 balance for signer 0
//   5 passing

import hre from "hardhat";
import { expect } from "chai";
import { MyToken } from "../typechain-types";

describe("mytoken deploy", () => {
  let myTokenC: MyToken;
  before("should deploy", async () => {
    myTokenC = await hre.ethers.deployContract("MyToken", [
      "MyToken",
      "MT",
      18,
    ]);
  });
  it("should return name", async () => {
    expect(await myTokenC.name()).equal("MyToken");
  });
  it("should return symbol", async () => {
    expect(await myTokenC.symbol()).equal("MT");
  });
  it("should return decimals", async () => {
    expect(await myTokenC.decimals()).equal(18);
  });
  it("should return 0 totalSupply", async () => {
    expect(await myTokenC.totalSupply()).equal(0);
  });
  it("should return 0 balance for signer 0", async () => {
    const signers = await hre.ethers.getSigners();
    expect(await myTokenC.balanceOf(signers[0].address)).equal(0);
  });
});
