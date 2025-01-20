import { API_URL } from "../config"

export async function fetchDepMapData(ensemblId: string) {
  const query = `
    query Depmap($ensemblId: String!) {
      target(ensemblId: $ensemblId) {
        id
        approvedSymbol
        depMapEssentiality {
          tissueName
          screens {
            depmapId
            cellLineName
            diseaseFromSource
            geneEffect
            expression
          }
        }
      }
    }
  `

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { ensemblId },
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }

  const { data } = await response.json()
  if (!data.target || !data.target.depMapEssentiality) {
    throw new Error(`No DepMap data available for gene: ${ensemblId}`)
  }

  return {
    ensemblId: data.target.id,
    approvedSymbol: data.target.approvedSymbol,
    depMapEssentiality: data.target.depMapEssentiality,
  }
}

