import {faker} from '@faker-js/faker';
import { Recommendation } from '@prisma/client';
import { prisma } from '../../src/database';
import { CreateRecommendationData } from '../../src/services/recommendationsService';


function allowedRecomendation():CreateRecommendationData{
  const youtubeLink = `https://www.youtube.com/${faker.lorem.words()}`;
  return{
    name:faker.name.firstName(),
    youtubeLink
  }
}

function wrongNameRecomendation():{name:any,youtubeLink:string}{

  const youtubeLink = `https://www.youtube.com/${faker.lorem.words()}`;
  return{
    name:Number(faker.random.numeric()),
    youtubeLink
  }
}

function wrongLinkRecomendation():CreateRecommendationData{
  const youtubeLink = faker.internet.url();
  return{
    name:faker.name.firstName(),
    youtubeLink
  }
}

function randomNumber(){
  return Number(faker.random.numeric(2))
}

async function createManyRecomendations(amount:number) {
  let limit = 1;
  const allRecommendations:Recommendation[]=[]
  while(limit<=amount){
    const recommendationCreated:Recommendation = await recomendation()
    allRecommendations.push(recommendationCreated)
    limit++
  }

  if(allRecommendations.length>10){
    const newAllRecommendations = allRecommendations.reverse();
    const sliceLimit = allRecommendations.length-(allRecommendations.length-10)
    return newAllRecommendations.slice(0,sliceLimit)
  }else{

    return allRecommendations.reverse()
  }

}

async function recomendation(setData?:any){
 const recomendation : Recommendation= await prisma.recommendation.create({data:{...allowedRecomendation(),...setData}});
  return recomendation
}

export default {
  allowedRecomendation,
  wrongNameRecomendation,
  wrongLinkRecomendation,
  recomendation,
  randomNumber,
  createManyRecomendations
}